package org.cqipc.edu.controller;

import org.cqipc.edu.bean.Norder;
import org.cqipc.edu.bean.Product;
import org.cqipc.edu.bean.Userinfo;
import org.cqipc.edu.mybatis.Page;
import org.cqipc.edu.service.OrderService;
import org.cqipc.edu.service.ProductService;
import org.cqipc.edu.service.UserinfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class UserinfoController {
    @Autowired
    UserinfoService us;
    @Autowired
    ProductService ps;
    @Autowired
    OrderService os;

    @RequestMapping("selectUserInfoById")
    @ResponseBody
    public Userinfo selectUserinfoById(@RequestParam("u_id") int u_id) {
        return us.selectUserinfoById(u_id);
    }

    //��ת����¼��ע��ҳ��ķ���
    @RequestMapping("accountLogin")
    public String accountLogin() {
        return "account";
    }

    @RequestMapping("UserLogin")
    @ResponseBody
    public String[] UserLogin(@RequestParam("u_name1") String u_name,
                              @RequestParam("u_password1") String u_password,
                              HttpSession session, HttpServletResponse response) {
        response.setContentType("text/html;charset=utf-8");
        Userinfo ui = us.userLogin(u_name, u_password);
        session.setAttribute("userinfo", ui);
        Map<Product, Integer> cart = new HashMap<Product, Integer>();
        session.setAttribute("cart", cart);
        String[] s = new String[1];
        if (ui != null) {
            s[0] = "ok";
        } else {
            s[0] = "no";
        }
        return s;
    }

    //�û���ת��������Ϣҳ��ķ���
    @RequestMapping("selectUsersPage")
    public String selectUsersPage() {
        return "UserInfo";
    }

    //�û�ҳ���޸ĸ�����Ϣ��תҳ��ķ���
    @RequestMapping("jumpUserModify")
    public String jumpUserModify() {
        return "UpdateUse";
    }

    //�û���ѯ���˶�����ʷ��¼�ķ���
    @RequestMapping("selectUserNorders")
    public String selectUserNorders(HttpSession session, Model model,
                                    @RequestParam(value = "page", defaultValue = "1") Integer pageNo) {
        Userinfo ui = (Userinfo) session.getAttribute("userinfo");
        Page<Norder> nList = os.selectNorderLayUIPageAll(pageNo, ui.getU_id());
        model.addAttribute("nolist", nList);
        return "aliready";
    }

    //���ﳵ�������Ʒ�ķ���
    @RequestMapping("addCart")
    public String addCart(@RequestParam("key") int p_id,
                          @RequestParam("v") int n, HttpSession session, Model model) {
        Map<Product, Integer> cart = (Map<Product, Integer>) session.getAttribute("cart");
        Set<Product> set = cart.keySet();
        int num = 0;
        Product p = null;
        for (Product pt : set) {
            if (pt.getP_id() == p_id) {
                num = cart.get(pt);
                p = pt;
            }
        }
        if (num == 0) {
            p = ps.selectProductById(p_id);
            cart.put(p, n);
        } else {
            cart.remove(p);
            cart.put(p, (n + num));
        }
        session.setAttribute("cart", cart);
        model.addAttribute("product", p);
        model.addAttribute("addCartInfo", "��ӳɹ���");
        return "product";
    }

    //�ӹ��ﳵ���Ƴ�ĳһ����Ʒ�ķ���
    @RequestMapping("removeProductCart")
    public String removeProductCart(@RequestParam("key") int key
            , HttpSession session, Model model) {
        Map<Product, Integer> cart = (Map<Product, Integer>) session.getAttribute("cart");
        Set<Product> set = cart.keySet();
        int count = 0;
        double sumprice = 0;
        //�����̲߳���ȫ���⣬�����cart��map�����У�
        //��ֱ��remove�������java.util.ConcurrentModificationException�쳣��
        //���������е�remove�����ǰ�ȫ�ģ�����ڵ��߳����ظ����ҽ���ʹ��ѭ����������򼯺�
        //ֻ��ʹ�õ����������򲻿ɱ����쳣����
        Iterator<Product> it = set.iterator();
        while (it.hasNext()) {
            Product pt = it.next();
            if (pt.getP_id() == key) {
                it.remove();
            }
        }
        for (Product pt : set) {
            count += cart.get(pt);
            sumprice += pt.getP_price() * cart.get(pt);
        }
        session.setAttribute("cart", cart);
        model.addAttribute("count", count);
        model.addAttribute("sumprice", sumprice);
        model.addAttribute("cartInfo", "�����ɹ���");
        return "cart";
    }

    //�ӹ��ﳵҳ�����˻��ķ���
    @RequestMapping("updateCartNumber")
    public String updateCartNumber(@RequestParam("p_id") int p_id,
                                   @RequestParam("num") int num,
                                   HttpSession session, Model model) {
        Map<Product, Integer> cart = (Map<Product, Integer>) session.getAttribute("cart");
        Set<Product> set = cart.keySet();
        int count = 0;
        double sumprice = 0;
        Product p = null;
        Iterator<Product> it = set.iterator();
        while (it.hasNext()) {
            Product pt = it.next();
            if (pt.getP_id() == p_id) {
                p = pt;
                it.remove();
            }
        }
        if (num != 0) {
            cart.put(p, num);
        }
        for (Product pt : set) {
            count += cart.get(pt);
            sumprice += pt.getP_price() * cart.get(pt);
        }
        session.setAttribute("cart", cart);
        model.addAttribute("count", count);
        model.addAttribute("sumprice", sumprice);
        model.addAttribute("cartInfo", "�����ɹ���");
        return "cart";
    }

    //���ͷ��ע����ť���˳���ǰ��¼״̬�ķ���
    @RequestMapping("zhuxiao")
    public String zhuxiao(HttpSession session) {
        session.removeAttribute("userinfo");
        return "index";
    }

    //ע���û��ķ���
    @RequestMapping("regUser")
    public String regUser(Userinfo ui, Model model) {
        ui.setU_createDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date()));
        int count = us.addUserinfo(ui);
        if (count == 1) {
            model.addAttribute("regInfo", "ע��ɹ���");
        } else {
            model.addAttribute("regInfo", "ע��ʧ�ܣ�");
        }
        return "account";
    }

    //�û�ǰ�˵������е����Ŀ��ѯ��Ŀ����Ʒ��URL
    @RequestMapping("usersSelectCategory")
    public String usersSelectCategory(@RequestParam("cg_id") int cg_id, Model model,
                                      @RequestParam("pageCount") int pageCount,
                                      @RequestParam(value = "pageSize", required = false, defaultValue = "6") int pageSize) {
        List<Product> pList = ps.usersSelectProductByCgid(cg_id, pageCount, pageSize);
        int count = ps.usersSelectProductByCgidCount(cg_id, pageSize);
        model.addAttribute("pList", pList);
        model.addAttribute("pageCount", pageCount);
        model.addAttribute("count", count);
        model.addAttribute("cg_id", cg_id);
        return "category";
    }

    //=============================================����Ϊ������ݴ���ķ���ģ��
    @RequestMapping("selectUserInfoAll")
    @ResponseBody
    public Map<String, Object> selectUserInfoAll(@RequestParam("page") int page,
                                                 @RequestParam(value = "rows", required = false,
                                                         defaultValue = "5") int rows) {
        int total = us.selectUserCount();
        List<Userinfo> list = us.selectUserinfoAll(page, rows);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("total", total);
        map.put("rows", list);
        return map;
    }

    @RequestMapping("selectSearchUserInfoAll")
    @ResponseBody
    public Map<String, Object> selectUserInfoAll(@RequestParam("page") int page,
                                                 @RequestParam(value = "rows", required = false,
                                                         defaultValue = "5") int rows, String keyWord) throws UnsupportedEncodingException {
        keyWord = new String(keyWord.getBytes("ISO-8859-1"), "UTF-8");
        int total = us.selectUserCount();
        List<Userinfo> list = us.selectUserInfoPageKeyWord(page, rows, keyWord);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("total", total);
        map.put("rows", list);
        return map;
    }

    @RequestMapping("deleteUserById")
    @ResponseBody
    public int removeUserinfoById(@RequestParam("u_id") int u_id) {
        return us.removeUserById(u_id);
    }

    @RequestMapping("insertUserInfo")
    @ResponseBody
    public int insertUserInfo(Userinfo ui) {
        ui.setU_createDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date()));
        return us.addUserinfo(ui);
    }

    @RequestMapping("updateUserInfo")
    @ResponseBody
    public int updateUserInfo(Userinfo ui) {
        return us.modifyUserinfo(ui);
    }
}

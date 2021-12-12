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

    //跳转到登录和注册页面的方法
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

    //用户跳转到个人信息页面的方法
    @RequestMapping("selectUsersPage")
    public String selectUsersPage() {
        return "UserInfo";
    }

    //用户页面修改个人信息跳转页面的方法
    @RequestMapping("jumpUserModify")
    public String jumpUserModify() {
        return "UpdateUse";
    }

    //用户查询个人订单历史记录的方法
    @RequestMapping("selectUserNorders")
    public String selectUserNorders(HttpSession session, Model model,
                                    @RequestParam(value = "page", defaultValue = "1") Integer pageNo) {
        Userinfo ui = (Userinfo) session.getAttribute("userinfo");
        Page<Norder> nList = os.selectNorderLayUIPageAll(pageNo, ui.getU_id());
        model.addAttribute("nolist", nList);
        return "aliready";
    }

    //向购物车中添加商品的方法
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
        model.addAttribute("addCartInfo", "添加成功！");
        return "product";
    }

    //从购物车中移除某一个商品的方法
    @RequestMapping("removeProductCart")
    public String removeProductCart(@RequestParam("key") int key
            , HttpSession session, Model model) {
        Map<Product, Integer> cart = (Map<Product, Integer>) session.getAttribute("cart");
        Set<Product> set = cart.keySet();
        int count = 0;
        double sumprice = 0;
        //由于线程不安全问题，如果在cart（map集合中）
        //中直接remove将会出现java.util.ConcurrentModificationException异常，
        //而迭代器中的remove方法是安全的，因此在单线程下重复并且交替使用循环迭代数组或集合
        //只能使用迭代器，否则不可避免异常出现
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
        model.addAttribute("cartInfo", "操作成功！");
        return "cart";
    }

    //从购物车页面中退货的方法
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
        model.addAttribute("cartInfo", "操作成功！");
        return "cart";
    }

    //点击头部注销按钮后退出当前登录状态的方法
    @RequestMapping("zhuxiao")
    public String zhuxiao(HttpSession session) {
        session.removeAttribute("userinfo");
        return "index";
    }

    //注册用户的方法
    @RequestMapping("regUser")
    public String regUser(Userinfo ui, Model model) {
        ui.setU_createDate(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss").format(new Date()));
        int count = us.addUserinfo(ui);
        if (count == 1) {
            model.addAttribute("regInfo", "注册成功！");
        } else {
            model.addAttribute("regInfo", "注册失败！");
        }
        return "account";
    }

    //用户前端导航栏中点击类目查询类目下商品的URL
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

    //=============================================以下为后端数据处理的方法模型
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

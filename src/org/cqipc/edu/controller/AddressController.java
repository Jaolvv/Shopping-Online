package org.cqipc.edu.controller;

import org.apache.ibatis.annotations.Param;
import org.cqipc.edu.bean.Address;
import org.cqipc.edu.bean.Userinfo;
import org.cqipc.edu.service.UserinfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Create with IDEA
 *
 * @ClassName: AddressController
 * @Author : Liu Xingyu
 * @Create: 7/7/2021
 * @Description:
 */


@Controller
public class AddressController {

    @Autowired
    private UserinfoService userinfoService;

    @RequestMapping("/selectAllAddressPageByuid")

    public Map<String, Object> selectAllAddressPageByuid(Model model, @Param("u_id") Integer u_id,
                                                         @RequestParam(value = "pageSize", required = false, defaultValue = "5") int pageSize,
                                                         @RequestParam(value = "pageCount", required = false, defaultValue = "1") int pageCount) {
        int total = userinfoService.selectUserCount();
        List<Address> li = userinfoService.selectAllAddressPageByuid(u_id, pageCount, pageSize);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("total", total);
        map.put("li", li);
        return map;
    }

    @RequestMapping("/selectAllAddress")
    @ResponseBody
    public Map<String, Object> selectAllAddress() {
        List<Address> ad = userinfoService.selectAllAddress();
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("ad", ad);
        return map;
    }


    @RequestMapping("/selectAllAddressPage")
    @ResponseBody
    public Map<String, Object> selectAllAddressPage(@RequestParam("page") Integer page,
                                                    @RequestParam(value = "rows", required = false, defaultValue = "5") Integer rows) {

        int total = userinfoService.selectUserCount();
        List<Address> ro = userinfoService.selectAllAddressPage(page, rows);
        Map<String, Object> map = new HashMap<String, Object>();
        System.out.println(ro);
        map.put("rows", ro);
        map.put("total", total);
        return map;
    }


    @RequestMapping("/addAddress")
    public String addAddress(Address address) {
        System.out.println(address + "+++++");
        userinfoService.addAddress(address);
        return "redirect:/product/selectCart";
    }


    @RequestMapping("/updateAddress")
    @ResponseBody
    public int updateAddress(Address address) {
        return userinfoService.updateAddress(address);
    }


    @RequestMapping("/deleteAddress")
    @ResponseBody
    public int deleteAddress(@RequestParam("a_id") Integer a_id) {
        return userinfoService.deleteAddress(a_id);
    }


    @RequestMapping("/selectAllAddressByuid")
    public String selectAllAddressByuid(HttpSession session, Address address, @Param("u_id") Integer u_id, Model model) {

        Userinfo ui = (Userinfo) session.getAttribute("userinfo");
        List<Address> addresses = userinfoService.selectAllAddressByuid(u_id);

        //  Address exitAddress=userinfoService.selectAllAddressByuid(address.getA_addr());
        Map<String, Object> map = new HashMap<String, Object>();

        model.addAttribute("addresses", addresses);
        return "cart";
    }
}
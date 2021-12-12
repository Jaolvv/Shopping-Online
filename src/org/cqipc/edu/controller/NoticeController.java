package org.cqipc.edu.controller;

import org.cqipc.edu.bean.Notice;
import org.cqipc.edu.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.websocket.server.PathParam;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller

public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @RequestMapping("/selectNoticeAll")
    @ResponseBody
    public Map<String, Object> selectNoticeAllPage(@RequestParam("page") int page,
                                                   @RequestParam(value = "rows", required = false, defaultValue = "5") int rows) {
        Map<String, Object> map = new HashMap<String, Object>();
        int total = noticeService.selectNoticeTotalCount();
        List<Notice> list = noticeService.selectNoticeAllPage(page, rows);
        map.put("total", total);
        map.put("rows", list);
        return map;
    }
    @RequestMapping("/addNotice")
    @ResponseBody
    public int addNotice(Notice notice) {
        return noticeService.addNotice(notice);
    }

    @RequestMapping("/deleteNotice")
    @ResponseBody
    public int deleteNotice(@PathParam("n_id") Integer n_id) {
        return noticeService.deleteNotice(n_id);
    }

    @RequestMapping("/updateNotice")
    @ResponseBody
    public int updateNotice(Notice notice) {
        return noticeService.updateNotice(notice);
    }

    @RequestMapping("/selectNoticeByDate")
    public String selectNoticeByDate(Model model) {
        List<Notice> Date = noticeService.selectNoticeByDate();
        if (Date == null) {
            model.addAttribute("Date", "没有公告");
        } else {
            model.addAttribute("Date", Date);
        }
        return "redirect:/selectNoticeAll";
    }

}

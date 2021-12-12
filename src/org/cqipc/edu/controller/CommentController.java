package org.cqipc.edu.controller;

import org.apache.ibatis.annotations.Param;
import org.cqipc.edu.bean.Comment;
import org.cqipc.edu.bean.Userinfo;
import org.cqipc.edu.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class CommentController {
    @Autowired
    private CommentService commentService;

    @RequestMapping("/selectAllComment")
    @ResponseBody
    public Map<String, Object> selectAllComment() {
        List<Comment> co = commentService.selectAllComment();
        Map<String, Object> map = new HashMap<>();
        int total = commentService.selectCommentTotalCount();
        map.put("co", co);
        map.put("total", total);
        return map;

    }

    @RequestMapping("/selectAllCommentPage")
    @ResponseBody
    public Map<String, Object> selectAllCommentPage(
            @RequestParam(value = "page", required = false, defaultValue = "1") Integer page,
            @RequestParam(value = "rows", required = false, defaultValue = "5") Integer rows) {
        List<Comment> co = commentService.selectAllCommentPage(page, rows);
        int total = commentService.selectCommentTotalCount();
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("total", total);
        map.put("rows", co);
        return map;
    }

    @RequestMapping("/selectAllCommentPageByuid")
    @ResponseBody
    public Map<String, Object> selectAllCommentPageByuid(
            @RequestParam(value = "pageCount", required = false, defaultValue = "1") int pageCount,
            @RequestParam(value = "pageSize", required = false, defaultValue = "5") int pageSize, Integer u_id) {
        List<Comment> co = commentService.selectAllCommentPageByuid(pageCount, pageSize, u_id);
        int total = commentService.selectCommentTotalCount();
        Map<String, Object> map = new HashMap<>();
        map.put("total", total);
        map.put("co", co);
        return map;

    }

    @RequestMapping("/selectAllCommentPageBypid")
    @ResponseBody
    public Map<String, Object> selectAllCommentPageBypid(
            @RequestParam(value = "pageCount", required = false, defaultValue = "1") int pageCount,
            @RequestParam(value = "pageSize", required = false, defaultValue = "5") int pageSize, Integer p_id) {
        List<Comment> co = commentService.selectAllCommentPageBypid(pageCount, pageSize, p_id);
        int total = commentService.selectCommentTotalCount();
        Map<String, Object> map = new HashMap<>();
        map.put("total", total);
        map.put("co", co);
        return map;

    }

    @RequestMapping("/addComment")
    @ResponseBody
    public int addComment(HttpSession session, Comment comment) {
        Userinfo ui = (Userinfo) session.getAttribute("userinfo");
        comment.setU_id(ui.getU_id());
        return commentService.addComment(comment);
    }

    @RequestMapping("deleteComment")
    @ResponseBody
    public int deleteComment(@Param("u_id") int u_id, @Param("p_id") int p_id, @Param("co_id") int co_id) {
        return commentService.deleteComment(u_id, p_id, co_id);
    }
}

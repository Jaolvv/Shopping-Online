package org.cqipc.edu.service.impl;

/**
 * Create with IDEA
 *
 * @ClassName: CommentServiceImpl
 * @Author : Liu Xingyu
 * @Create: 7/7/2021
 * @Description:
 */

import org.cqipc.edu.bean.Comment;
import org.cqipc.edu.dao.CommentDao;
import org.cqipc.edu.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentDao commentDao;

    @Override
    public int selectCommentTotalCount() {
        return this.commentDao.selectCommentTotalCount();
    }

    @Override
    public List<Comment> selectAllComment() {
        return this.selectAllComment();
    }

    @Override
    public List<Comment> selectAllCommentPage(int pageCount, int pageSize) {
        int page = (pageCount - 1) * pageSize;
        return this.commentDao.selectAllCommentPage(page, pageSize);
    }

    @Override
    public List<Comment> selectAllCommentPageByuid(int pageCount, int pageSize, int u_id) {
        int page = (pageCount - 1) * pageSize;
        return this.commentDao.selectAllCommentPageByuid(page, pageSize, u_id);
    }

    @Override
    public List<Comment> selectAllCommentPageBypid(int pageCount, int pageSize, int p_id) {
        int page = (pageCount - 1) * pageSize;
        return this.commentDao.selectAllCommentPageBypid(page, pageSize, p_id);
    }

    @Override
    public int addComment(Comment commment) {
        return this.commentDao.addComment(commment);
    }

    @Override
    public int deleteComment(int u_id, int p_id, int co_id) {
        return this.commentDao.deleteComment(u_id, p_id, co_id);
    }

}

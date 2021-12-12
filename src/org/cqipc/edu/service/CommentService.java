package org.cqipc.edu.service;

import org.apache.ibatis.annotations.Param;
import org.cqipc.edu.bean.Comment;

import java.util.List;

public interface CommentService {

    public int selectCommentTotalCount();

    public List<Comment> selectAllComment();

    public List<Comment> selectAllCommentPage(@Param("pageCount") int pageCount, @Param("pageSize") int pageSize);

    public List<Comment> selectAllCommentPageByuid(@Param("pageCount") int pageCount, @Param("pageSize") int pageSize,
                                                   @Param("u_id") int u_id);

    public List<Comment> selectAllCommentPageBypid(@Param("pageCount") int pageCount, @Param("pageSize") int pageSize,
                                                   @Param("p_id") int p_id);

    public int addComment(Comment commment);

    public int deleteComment(@Param("u_id") int u_id, @Param("p_id") int p_id, @Param("co_id") int co_id);
}

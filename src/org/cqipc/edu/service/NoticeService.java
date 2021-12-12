package org.cqipc.edu.service;

import org.apache.ibatis.annotations.Param;
import org.cqipc.edu.bean.Notice;

import java.util.List;

public interface NoticeService {

    public int selectNoticeTotalCount();

    public Notice selectNoticeById(int n_id);

    public List<Notice> selectNoticeByDate();

    public List<Notice> selectNoticeAll();

    public List<Notice> selectNoticeAllPage(@Param("pageCount") int pageCount, @Param("pageSize") int pageSize);

    public int addNotice(Notice notice);

    public int updateNotice(Notice notice);

    public int deleteNotice(int n_id);
}

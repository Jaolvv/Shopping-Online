package org.cqipc.edu.service.impl;

/**
 * Create with IDEA
 *
 * @ClassName: NoticeServiceImpl
 * @Author : Liu Xingyu
 * @Create: 7/7/2021
 * @Description:
 */

import org.cqipc.edu.bean.Notice;
import org.cqipc.edu.dao.NoticeDao;
import org.cqipc.edu.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeServiceImpl implements NoticeService {
    @Autowired
    private NoticeDao noticeDao;

    @Override
    public int selectNoticeTotalCount() {
        return this.noticeDao.selectNoticeTotalCount();
    }

    @Override
    public Notice selectNoticeById(int n_id) {
        return this.noticeDao.selectNoticeById(n_id);
    }

    @Override
    public List<Notice> selectNoticeByDate() {
        return this.noticeDao.selectNoticeByDate();
    }

    @Override
    public List<Notice> selectNoticeAll() {
        return this.noticeDao.selectNoticeAll();
    }

    @Override
    public List<Notice> selectNoticeAllPage(int pageCount, int pageSize) {
        int page = (pageCount - 1) * pageSize;
        return this.noticeDao.selectNoticeAllPage(page, pageSize);
    }

    @Override
    public int addNotice(Notice notice) {
        return this.noticeDao.addNotice(notice);
    }

    @Override
    public int updateNotice(Notice notice) {
        return this.noticeDao.updateNotice(notice);
    }

    @Override
    public int deleteNotice(int n_id) {
        return this.noticeDao.deleteNotice(n_id);
    }

}

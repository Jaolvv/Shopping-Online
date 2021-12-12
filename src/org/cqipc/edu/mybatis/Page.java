package org.cqipc.edu.mybatis;

import java.util.List;

/**
 * Created by yulei on 16-7-12.
 */
public class Page<T> {

    public static final int DEFAULT_PAGE_SIZE = 5;

    protected int pageNo = 1; // 当前页 默认为第1页
    protected int pageSize = DEFAULT_PAGE_SIZE; // 每页记录数
    protected long totalRecord = -1L; // 总记录数, 默认-1
    protected int totalPage = -1; // 总页数  默认-1
    protected int start;
    protected int end;


    protected List<T> results; // 当前页记录List形式

    public int getStart() {
        return (pageNo - 1) * pageSize;
    }

    public long getEnd() {
        return this.getStart() + pageSize > totalRecord ? totalRecord : this.getStart() + pageSize;
    }

    public int getPageNo() {
        return pageNo;
    }

    public void setPageNo(int pageNo) {
        if (pageNo > 0) {
            this.pageNo = pageNo;
        }
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        if (pageSize > 0) {
            this.pageSize = pageSize;
        }
        computeTotalPage();
    }

    public long getTotalRecord() {
        return totalRecord;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalRecord(long totalRecord) {
        this.totalRecord = totalRecord;
        computeTotalPage();
    }

    protected void computeTotalPage() {
        if (getPageSize() > 0 && getTotalRecord() > -1) {
            this.totalPage = (int) (getTotalRecord() % getPageSize() == 0 ? getTotalRecord() / getPageSize() : getTotalRecord() / getPageSize() + 1);
        }
    }

    public List<T> getResults() {
        return results;
    }

    public void setResults(List<T> results) {
        this.results = results;
    }

    @Override
    public String toString() {
        return "Page{" +
                "pageNo=" + pageNo +
                ", pageSize=" + pageSize +
                ", totalRecord=" + totalRecord +
                ", totalPage=" + totalPage +
                ", start=" + start +
                ", end=" + end +
                ", results=" + results +
                '}';
    }
}
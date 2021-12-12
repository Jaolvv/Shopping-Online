package org.cqipc.edu.bean;

/**
 * Create with IDEA
 *
 * @ClassName: Notice
 * @Author : Liu Xingyu
 * @Create: 7/7/2021
 * @Description:
 */

import java.util.Date;

public class Notice {

    private int n_id;
    private String n_title;
    private String n_content;
    private Date n_date;

    public int getN_id() {
        return n_id;
    }

    public void setN_id(int n_id) {
        this.n_id = n_id;
    }

    public String getN_title() {
        return n_title;
    }

    public void setN_title(String n_title) {
        this.n_title = n_title;
    }

    public String getN_content() {
        return n_content;
    }

    public void setN_content(String n_content) {
        this.n_content = n_content;
    }

    public Date getN_date() {
        return n_date;
    }

    public void setN_date(Date n_date) {
        this.n_date = n_date;
    }

    @Override
    public String toString() {
        return "Notice{" +
                "n_id=" + n_id +
                ", n_title='" + n_title + '\'' +
                ", n_content='" + n_content + '\'' +
                ", n_date=" + n_date +
                '}';
    }
}

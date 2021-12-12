package org.cqipc.edu.bean;

/**
 * Create with IDEA
 *
 * @ClassName: comment
 * @Author : Liu Xingyu
 * @Create: 7/7/2021
 * @Description:
 */

public class Comment {

    private int co_id;
    private String co_comment;
    private Product product;
    private Userinfo userinfo;
    private int p_id;
    private int u_id;

    public int getCo_id() {
        return co_id;
    }

    public void setCo_id(int co_id) {
        this.co_id = co_id;
    }

    public String getCo_comment() {
        return co_comment;
    }

    public void setCo_comment(String co_comment) {
        this.co_comment = co_comment;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Userinfo getUserinfo() {
        return userinfo;
    }

    public void setUserinfo(Userinfo userinfo) {
        this.userinfo = userinfo;
    }

    public int getP_id() {
        return p_id;
    }

    public void setP_id(int p_id) {
        this.p_id = p_id;
    }

    public int getU_id() {
        return u_id;
    }

    public void setU_id(int u_id) {
        this.u_id = u_id;
    }

    @Override
    public String toString() {
        return "comment{" +
                "co_id=" + co_id +
                ", co_comment='" + co_comment + '\'' +
                ", product=" + product +
                ", userinfo=" + userinfo +
                ", p_id=" + p_id +
                ", u_id=" + u_id +
                '}';
    }
}

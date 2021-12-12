package org.cqipc.edu.bean;

/**
 * Create with IDEA
 *
 * @ClassName: Address
 * @Author : Liu Xingyu
 * @Create: 7/7/2021
 * @Description:
 */

public class Address {

    private int a_id;
    private String a_addr;
    private int u_id;
    private Userinfo userinfo;

    public int getA_id() {
        return a_id;
    }

    public void setA_id(int a_id) {
        this.a_id = a_id;
    }

    public String getA_addr() {
        return a_addr;
    }

    public void setA_addr(String a_addr) {
        this.a_addr = a_addr;
    }

    public int getU_id() {
        return u_id;
    }

    public void setU_id(int u_id) {
        this.u_id = u_id;
    }

    public Userinfo getUserinfo() {
        return userinfo;
    }

    public void setUserinfo(Userinfo userinfo) {
        this.userinfo = userinfo;
    }

    @Override
    public String toString() {
        return "Address{" +
                "a_id=" + a_id +
                ", a_addr='" + a_addr + '\'' +
                ", u_id=" + u_id +
                ", userinfo=" + userinfo +
                '}';
    }
}

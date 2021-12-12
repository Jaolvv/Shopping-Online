package org.cqipc.edu.bean;

public class Userinfo {
    private int u_id;
    private String u_name;
    private String u_password;
    private String u_email;
    private String u_addr;
    private String u_zip;
    private String u_phone;
    private String u_createDate;

    public int getU_id() {
        return u_id;
    }

    public void setU_id(int u_id) {
        this.u_id = u_id;
    }

    public String getU_name() {
        return u_name;
    }

    public void setU_name(String u_name) {
        this.u_name = u_name;
    }

    public String getU_password() {
        return u_password;
    }

    public void setU_password(String u_password) {
        this.u_password = u_password;
    }

    public String getU_email() {
        return u_email;
    }

    public void setU_email(String u_email) {
        this.u_email = u_email;
    }

    public String getU_addr() {
        return u_addr;
    }

    public void setU_addr(String u_addr) {
        this.u_addr = u_addr;
    }

    public String getU_zip() {
        return u_zip;
    }

    public void setU_zip(String u_zip) {
        this.u_zip = u_zip;
    }

    public String getU_phone() {
        return u_phone;
    }

    public void setU_phone(String u_phone) {
        this.u_phone = u_phone;
    }

    public String getU_createDate() {
        return u_createDate;
    }

    public void setU_createDate(String u_createDate) {
        this.u_createDate = u_createDate;
    }

    public Userinfo() {
    }

    public Userinfo(int u_id, String u_name, String u_password, String u_email,
                    String u_addr, String u_zip, String u_phone, String u_createDate) {
        this.u_id = u_id;
        this.u_name = u_name;
        this.u_password = u_password;
        this.u_email = u_email;
        this.u_addr = u_addr;
        this.u_zip = u_zip;
        this.u_phone = u_phone;
        this.u_createDate = u_createDate;
    }

    public Userinfo(String u_name, String u_password, String u_email,
                    String u_addr, String u_zip, String u_phone, String u_createDate) {
        this.u_name = u_name;
        this.u_password = u_password;
        this.u_email = u_email;
        this.u_addr = u_addr;
        this.u_zip = u_zip;
        this.u_phone = u_phone;
        this.u_createDate = u_createDate;
    }

    @Override
    public String toString() {
        return "Userinfo [u_id=" + u_id + ", u_name=" + u_name
                + ", u_password=" + u_password + ", u_email=" + u_email
                + ", u_addr=" + u_addr + ", u_zip=" + u_zip + ", u_phone="
                + u_phone + ", u_createDate=" + u_createDate + "]";
    }
}

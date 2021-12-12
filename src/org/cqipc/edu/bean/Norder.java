package org.cqipc.edu.bean;

public class Norder {
    private int no_id;
    private Userinfo uId;
    private String no_orderdate;
    private String no_addr;
    private double no_sumprice;

    public int getNo_id() {
        return no_id;
    }

    public void setNo_id(int no_id) {
        this.no_id = no_id;
    }

    public Userinfo getuId() {
        return uId;
    }

    public void setuId(Userinfo uId) {
        this.uId = uId;
    }

    public String getNo_orderdate() {
        return no_orderdate;
    }

    public void setNo_orderdate(String no_orderdate) {
        this.no_orderdate = no_orderdate;
    }

    public String getNo_addr() {
        return no_addr;
    }

    public void setNo_addr(String no_addr) {
        this.no_addr = no_addr;
    }

    public double getNo_sumprice() {
        return no_sumprice;
    }

    public void setNo_sumprice(double no_sumprice) {
        this.no_sumprice = no_sumprice;
    }

    public Norder() {
    }

    public Norder(int no_id, Userinfo uId, String no_orderdate, String no_addr,
                  double no_sumprice) {
        this.no_id = no_id;
        this.uId = uId;
        this.no_orderdate = no_orderdate;
        this.no_addr = no_addr;
        this.no_sumprice = no_sumprice;
    }

    public Norder(Userinfo uId, String no_orderdate, String no_addr,
                  double no_sumprice) {
        this.uId = uId;
        this.no_orderdate = no_orderdate;
        this.no_addr = no_addr;
        this.no_sumprice = no_sumprice;
    }

    @Override
    public String toString() {
        return "Norder [no_id=" + no_id + ", uId=" + uId + ", no_orderdate="
                + no_orderdate + ", no_addr=" + no_addr + ", no_sumprice="
                + no_sumprice + "]";
    }
}

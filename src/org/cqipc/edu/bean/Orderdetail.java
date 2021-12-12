package org.cqipc.edu.bean;

public class Orderdetail {
    private int o_id;
    private Norder noId;
    private Product pId;
    private int quantity;
    private double price;

    public int getO_id() {
        return o_id;
    }

    public void setO_id(int o_id) {
        this.o_id = o_id;
    }

    public Norder getNoId() {
        return noId;
    }

    public void setNoId(Norder noId) {
        this.noId = noId;
    }

    public Product getpId() {
        return pId;
    }

    public void setpId(Product pId) {
        this.pId = pId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Orderdetail() {
    }

    public Orderdetail(int o_id, Norder noId, Product pId, int quantity,
                       double price) {
        this.o_id = o_id;
        this.noId = noId;
        this.pId = pId;
        this.quantity = quantity;
        this.price = price;
    }

    public Orderdetail(Norder noId, Product pId, int quantity, double price) {
        this.noId = noId;
        this.pId = pId;
        this.quantity = quantity;
        this.price = price;
    }

    @Override
    public String toString() {
        return "Orderdetail [o_id=" + o_id + ", noId=" + noId + ", pId=" + pId
                + ", quantity=" + quantity + ", price=" + price + "]";
    }
}

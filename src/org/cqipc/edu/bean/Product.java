package org.cqipc.edu.bean;

public class Product {
    private int p_id;
    private Ccategory cgId;
    private String p_name;
    private double p_price;
    private String p_supplier;
    private String p_imgName;
    private String p_introduction;

    public Product(int p_id, Ccategory ccategory, String s, int i, String p_imgName, String p_introduction) {
    }

    public String getP_imgName() {
        return p_imgName;
    }

    public void setP_imgName(String p_imgName) {
        this.p_imgName = p_imgName;
    }

    public int getP_id() {
        return p_id;
    }

    public void setP_id(int p_id) {
        this.p_id = p_id;
    }

    public Ccategory getCgId() {
        return cgId;
    }

    public void setCgId(Ccategory cgId) {
        this.cgId = cgId;
    }

    public String getP_name() {
        return p_name;
    }

    public void setP_name(String p_name) {
        this.p_name = p_name;
    }

    public double getP_price() {
        return p_price;
    }

    public void setP_price(double p_price) {
        this.p_price = p_price;
    }

    public String getP_supplier() {
        return p_supplier;
    }

    public void setP_supplier(String p_supplier) {
        this.p_supplier = p_supplier;
    }

    public String getP_introduction() {
        return p_introduction;
    }

    public void setP_introduction(String p_introduction) {
        this.p_introduction = p_introduction;
    }

    public Product() {
    }

    public Product(Ccategory cgId, String p_name, double p_price,
                   String p_supplier, String p_imgName , String p_introduction) {
        this.cgId = cgId;
        this.p_name = p_name;
        this.p_price = p_price;
        this.p_supplier = p_supplier;
        this.p_imgName = p_imgName;
        this.p_introduction = p_introduction;
    }

    public Product(int p_id, Ccategory cgId, String p_name, double p_price,
                   String p_supplier, String p_imgName , String p_introduction) {
        this.p_id = p_id;
        this.cgId = cgId;
        this.p_name = p_name;
        this.p_price = p_price;
        this.p_supplier = p_supplier;
        this.p_imgName = p_imgName;
        this.p_introduction = p_introduction;
    }

    @Override
    public boolean equals(Object obj) {
        Product p = (Product) obj;
        if (p.getP_id() == this.getP_id() && p.getP_name() == this.getP_name()) {
            return true;
        }
        return false;
    }

    @Override
    public String toString() {
        return "Product{" +
                "p_id=" + p_id +
                ", cgId=" + cgId +
                ", p_name='" + p_name + '\'' +
                ", p_price=" + p_price +
                ", p_supplier='" + p_supplier + '\'' +
                ", p_imgName='" + p_imgName + '\'' +
                ", p_introduction='" + p_introduction + '\'' +
                '}';
    }
}

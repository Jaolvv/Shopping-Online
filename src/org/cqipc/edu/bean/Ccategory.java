package org.cqipc.edu.bean;

public class Ccategory {
    private int cg_id;
    private String cg_name;

    public int getCg_id() {
        return cg_id;
    }

    public void setCg_id(int cg_id) {
        this.cg_id = cg_id;
    }

    public String getCg_name() {
        return cg_name;
    }

    public void setCg_name(String cg_name) {
        this.cg_name = cg_name;
    }

    public Ccategory() {
    }

    public Ccategory(int cg_id, String cg_name) {
        this.cg_id = cg_id;
        this.cg_name = cg_name;
    }

    public Ccategory(String cg_name) {
        this.cg_name = cg_name;
    }

    @Override
    public String toString() {
        return "Ccategory [cg_id=" + cg_id + ", cg_name=" + cg_name + "]";
    }
}

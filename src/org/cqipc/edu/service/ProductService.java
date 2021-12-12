package org.cqipc.edu.service;

import org.cqipc.edu.bean.Ccategory;
import org.cqipc.edu.bean.Product;

import java.util.List;

public interface ProductService {
    public List<Product> selectProductAlls();

    public List<Product> selectProductAll(int pageCount, int pageSize);

    public List<Ccategory> selectCcategoryAllPage(int pageCount, int pageSize);

    public int selecrPageNum();

    public Product selectProductById(int p_id);

    public int addCategory(Ccategory cg);

    public int modifyCategory(Ccategory cg);

    public int removeCategory(int cg_id);

    public String selectCategoryName(int cg_id);

    public List<Ccategory> selectCcategoryAll();

    public List<Product> selectProductByCgid(int cg_id);

    public int selecrProductCount();

    public int removeProductById(int p_id);

    public int addProduct(Product p);

    public int modifyProduct(Product p);

    public List<Product> usersSelectProductByCgid(int cg_id, int pageCount, int pageSize);

    public int usersSelectProductByCgidCount(int cg_id, int pageSize);
}

package org.cqipc.edu.service.impl;

import org.cqipc.edu.bean.Ccategory;
import org.cqipc.edu.bean.Product;
import org.cqipc.edu.dao.CcategoryDao;
import org.cqipc.edu.dao.ProductDao;
import org.cqipc.edu.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("productService")
public class ProductServiceImpl implements ProductService {
    @Autowired
    CcategoryDao cd;
    @Autowired
    ProductDao pd;

    @Override
    public List<Ccategory> selectCcategoryAllPage(int pageCount, int pageSize) {
        int p = (pageCount - 1) * pageSize;
        return cd.selectCcategoryAllPage(p, pageSize);
    }

    @Override
    public List<Product> selectProductAll(int pageCount, int pageSize) {
        int p = (pageCount - 1) * pageSize;
        return pd.selectProductAll(p, pageSize);
    }

    @Override
    public Product selectProductById(int p_id) {
        return pd.selectProductById(p_id);
    }

    @Override
    public int selecrPageNum() {
        return cd.selecrPageNum();
    }

    @Override
    public List<Ccategory> selectCcategoryAll() {
        return cd.selectCcategoryAll();
    }

    @Override
    public int addCategory(Ccategory cg) {
        return cd.addCategory(cg);
    }

    @Override
    public int modifyCategory(Ccategory cg) {
        return cd.modifyCategory(cg);
    }

    @Override
    public int removeCategory(int cg_id) {
        return cd.removeCategory(cg_id);
    }

    @Override
    public String selectCategoryName(int cg_id) {
        return cd.selectCategoryName(cg_id);
    }

    @Override
    public List<Product> selectProductByCgid(int cg_id) {
        return pd.selectProductByCgid(cg_id);
    }

    @Override
    public int selecrProductCount() {
        return pd.selecrProductCount();
    }

    @Override
    public List<Product> selectProductAlls() {
        return pd.selectProductAlls();
    }

    @Override
    public int removeProductById(int p_id) {
        return pd.removeProductById(p_id);
    }

    @Override
    public int addProduct(Product p) {
        return pd.addProduct(p);
    }

    @Override
    public int modifyProduct(Product p) {
        return pd.modifyProduct(p);
    }

    @Override
    public List<Product> usersSelectProductByCgid(int cg_id, int pageCount,
                                                  int pageSize) {
        int p = (pageCount - 1) * pageSize;
        return pd.usersSelectProductByCgid(cg_id, p, pageSize);
    }

    @Override
    public int usersSelectProductByCgidCount(int cg_id, int pageSize) {
        int num = pd.usersSelectProductByCgidCount(cg_id);
        return (num - 1) / pageSize + 1;
    }


}

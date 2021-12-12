package org.cqipc.edu.dao;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.cqipc.edu.bean.Product;

import java.util.List;

public interface ProductDao {
    public List<Product> selectProductAlls();

    public List<Product> selectProductAll(@Param("pageCount") int pageCount,
                                          @Param("pageSize") int pageSize);

    public Product selectProductById(int p_id);

    public List<Product> selectProductByCgid(@Param("cg_id") int cg_id);

    public int selecrProductCount();

    @Delete("delete from product where p_id=#{p_id}")
    public int removeProductById(int p_id);

    public int addProduct(Product p);

    public int modifyProduct(Product p);

    public List<Product> updateOrderdetailSelectProducts();

    public double selectProductPriceById(int p_id);

    public List<Product> usersSelectProductByCgid(@Param("cg_id") int cg_id,
                                                  @Param("pageCount") int pageCount,
                                                  @Param("pageSize") int pageSize);

    public int usersSelectProductByCgidCount(int cg_id);

}

package org.cqipc.edu.dao;

import org.apache.ibatis.annotations.Param;
import org.cqipc.edu.bean.Ccategory;

import java.util.List;

public interface CcategoryDao {
    public List<Ccategory> selectCcategoryAllPage(@Param("pageCount") int pageCount,
                                                  @Param("pageSize") int pageSize);

    public List<Ccategory> selectCcategoryAll();

    public int selecrPageNum();

    public int addCategory(Ccategory cg);

    public int modifyCategory(Ccategory cg);

    public int removeCategory(int cg_id);

    public String selectCategoryName(int cg_id);
}

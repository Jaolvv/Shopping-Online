package org.cqipc.edu.dao;

import org.apache.ibatis.annotations.Param;
import org.cqipc.edu.bean.Orderdetail;

import java.util.List;

public interface OrderdetailDao {
    public List<Orderdetail> selectOrderdetailByNoid(@Param("no_id") int no_id,
                                                     @Param("pageCount") int pageCount, @Param("pageSize") int pageSize);

    public Orderdetail selectOrderdetailByOid(int o_id);

    public int addOrderdetailInfo(Orderdetail o);

    public int removeOrderdetailById(@Param("o_id") int o_id);

    public int modifyOrderdetail(Orderdetail o);

    public int selectOrderdetailByNoidCount(int no_id);

    public List<Double> selectOrderdetailNorderPrice(int no_id);

    public List<Orderdetail> userSelectOrderdetailByNoid(int no_id);
}

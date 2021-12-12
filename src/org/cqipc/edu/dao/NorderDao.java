package org.cqipc.edu.dao;

import org.apache.ibatis.annotations.Param;
import org.cqipc.edu.bean.Norder;
import org.cqipc.edu.mybatis.Page;

import java.util.List;

public interface NorderDao {
    public List<Norder> selectNorderPageAll(@Param("pageCount") int pageCount,
                                            @Param("pageSize") int pageSize);

    public int selectNorderPageAllCount();

    public List<Norder> selectNorderByUid(@Param("u_id") int u_id,
                                          @Param("pageCount") int pageCount,
                                          @Param("pageSize") int pageSize);

    public int selectNorderByUidCount(int u_id);

    public Norder selectNorderByNid(int no_id);

    public int addNorderInfo(Norder n);

    public int removeNorderById(int no_id);

    public int modifyNorderInfo(Norder n);

    public int modifyNorderSumprice(@Param("no_id") int no_id,
                                    @Param("no_sumprice") double no_sumprice);

    public List<Norder> selectNorderLayUIPageAll(Page<Norder> page,
                                                 @Param("u_id") int u_id);
}

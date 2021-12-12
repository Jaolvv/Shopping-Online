package org.cqipc.edu.dao;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.cqipc.edu.bean.Userinfo;

import java.util.List;

public interface UserinfoDao {
    public int addUserinfo(Userinfo ui);

    public int modifyUserinfo(Userinfo ui);

    public Userinfo selectUserinfoById(int u_id);

    public List<Userinfo> selectUserInfoPageKeyWord(@Param("pageCount") int pageCount,
                                                    @Param("pageSize") int pageSize,
                                                    @Param("keyWord") String keyWord);

    public Userinfo userLogin(@Param("u_name") String u_name, @Param("u_password") String u_password);

    public List<Userinfo> selectUserinfoAll(@Param("pageCount") int pageCount,
                                            @Param("pageSize") int pageSize);

    public int selectUserCount();

    @Delete("delete from userinfo where u_id=#{u_id}")
    public int removeUserById(int u_id);

    public List<Userinfo> selectUserinfoAllToNorder();

    public String selectUserinfoAddr(int u_id);
}

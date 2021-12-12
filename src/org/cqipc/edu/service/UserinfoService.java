package org.cqipc.edu.service;

import org.apache.ibatis.annotations.Param;
import org.cqipc.edu.bean.Address;
import org.cqipc.edu.bean.Userinfo;

import java.util.List;

public interface UserinfoService {
    public int addUserinfo(Userinfo ui);

    public int modifyUserinfo(Userinfo ui);

    public Userinfo selectUserinfoById(int u_id);

    public List<Userinfo> selectUserInfoPageKeyWord(int pageCount, int pageSize, String keyWord);

    public Userinfo userLogin(String u_name,String u_password);

    public List<Userinfo> selectUserinfoAll(int pageCount, int pageSize);

    public int selectUserCount();

    public int removeUserById(int u_id);

    public int selectAddressTotalCount();

    public List<Address> selectAllAddressByuid(int u_id);

    public List<Address> selectAllAddressPageByuid(@Param("u_id") int u_id, @Param("pageCount") int pageCount, @Param("pageSize") int pageSize);

    public List<Address> selectAllAddress();

    public List<Address> selectAllAddressPage(@Param("pageCount") int pageCount, @Param("pageSize") int pageSize);

    public int addAddress(Address address);

    public int updateAddress(Address address);

    public int deleteAddress(int a_id);
}

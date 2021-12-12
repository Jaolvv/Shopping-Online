package org.cqipc.edu.dao;

/**
 * Create with IDEA
 *
 * @ClassName: AddressDao
 * @Author : Liu Xingyu
 * @Create: 7/7/2021
 * @Description:
 */

import org.apache.ibatis.annotations.Param;
import org.cqipc.edu.bean.Address;

import java.util.List;

public interface AddressDao {

    public int selectAddressTotalCount();

    public List<Address> selectAllAddressByuid(int u_id);
    public List<Address> selectAllAddressPageByuid(@Param("u_id")int u_id,@Param("pageCount")int pageCount,@Param("pageSize")int pageSize);
    public List<Address> selectAllAddress();

    public List<Address> selectAllAddressPage(@Param("pageCount")int pageCount,@Param("pageSize")int pageSize);
    public int addAddress(Address address);
    public int updateAddress(Address address);
    public int deleteAddress(int a_id);
}

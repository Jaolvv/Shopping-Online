package org.cqipc.edu.service.impl;

import org.cqipc.edu.bean.Address;
import org.cqipc.edu.bean.Userinfo;
import org.cqipc.edu.dao.AddressDao;
import org.cqipc.edu.dao.UserinfoDao;
import org.cqipc.edu.service.UserinfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userinfoService")
public class UserinfoServiceImpl implements UserinfoService {
    @Autowired
    UserinfoDao ud;

    @Autowired
    AddressDao ad;

    @Override
    public int addUserinfo(Userinfo ui) {
        return ud.addUserinfo(ui);
    }

    @Override
    public int modifyUserinfo(Userinfo ui) {
        return ud.modifyUserinfo(ui);
    }

    @Override
    public Userinfo selectUserinfoById(int u_id) {
        return ud.selectUserinfoById(u_id);
    }

    @Override
    public List<Userinfo> selectUserInfoPageKeyWord(int pageCount, int pageSize,
                                                    String keyWord) {
        int p = (pageCount - 1) * pageSize;
        return ud.selectUserInfoPageKeyWord(p, pageSize, keyWord);
    }

    @Override
    public Userinfo userLogin(String u_name, String u_password) {
        return ud.userLogin(u_name, u_password);
    }

    @Override
    public List<Userinfo> selectUserinfoAll(int pageCount, int pageSize) {
        int p = (pageCount - 1) * pageSize;
        return ud.selectUserinfoAll(p, pageSize);
    }

    @Override
    public int selectUserCount() {
        return ud.selectUserCount();
    }

    @Override
    public int removeUserById(int u_id) {
        return ud.removeUserById(u_id);
    }

    @Override
    public int selectAddressTotalCount() {
        return this.ad.selectAddressTotalCount();
    }

    @Override
    public List<Address> selectAllAddressByuid(int u_id) {
        return this.ad.selectAllAddressByuid(u_id);
    }

    @Override
    public List<Address> selectAllAddressPageByuid(int u_id, int pageCount, int pageSize) {
        int p = (pageCount - 1) * pageSize;
        return this.ad.selectAllAddressPageByuid(u_id, p, pageSize);
    }

    @Override
    public List<Address> selectAllAddress() {
        return this.selectAllAddress();
    }

    @Override
    public List<Address> selectAllAddressPage(int pageCount, int pageSize) {
        int p = (pageCount - 1) * pageSize;
        return this.ad.selectAllAddressPage(p, pageSize);
    }

    @Override
    public int addAddress(Address address) {
        return this.ad.addAddress(address);
    }

    @Override
    public int updateAddress(Address address) {
        return this.ad.updateAddress(address);
    }

    @Override
    public int deleteAddress(int a_id) {
        return this.ad.deleteAddress(a_id);
    }

}

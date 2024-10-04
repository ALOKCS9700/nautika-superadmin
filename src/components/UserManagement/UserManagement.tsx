import React, { Fragment, Dispatch, useState, useEffect } from "react";
import UserManagementList from "./UserManagementList";
import UserManagementForm from "./UserManagementForm";
import TopCard from "../../common/components/TopCard";
import "./UserManagement.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IProductState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import {
  removeProduct, clearSelectedProduct, setModificationState,
  changeSelectedProduct
} from "../../store/actions/products.action";
import { addNotification } from "../../store/actions/notifications.action";
import { ProductModificationStatus, IProduct } from "../../store/models/product.interface";
import axios from 'axios';

const UserManagement: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const products: IProductState = useSelector((state: IStateType) => state.products);
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  const numberItemsCount: number = products.products.length;
  const totalPrice: number = products.products.reduce((prev, next) => prev + ((next.price * next.amount) || 0), 0);
  const totalAmount: number = products.products.reduce((prev, next) => prev + (next.amount || 0), 0);
  const [popup, setPopup] = useState(false);
  const [popup2, setPopup2] = useState(false);
  const [SelectedUser, setSelectedUser] = useState([] as any);
  const [SelectedUserDelete, setSelectedUserDelete] = useState([] as any);

  // State for user data
  const [users, setUsers] = useState<any[]>([]);
  const [userCount, setUserCount] = useState<number>(0);
  const [totalWallet, setTotalWallet] = useState<number>(0);

  useEffect(() => {
    dispatch(clearSelectedProduct());
    dispatch(updateCurrentPath("products", "list"));

    // Fetch user data from API
    axios.get('https://vertex-fx.onrender.com/admin/users')
      .then(response => {
        if (response.data.status) {
          const userData = response.data.data;
          setUsers(userData);
          setUserCount(userData.length);
          setTotalWallet(userData.reduce((sum: any, user: any) => sum + (user.wallet || 0), 0));
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [path.area, dispatch]);

  function onProductSelect(product: IProduct): void {
    dispatch(changeSelectedProduct(product));
    dispatch(setModificationState(ProductModificationStatus.None));
  }

  function onSelectDeleteUser(user: any) {
    setSelectedUserDelete(user); //(user)
    setPopup(true);
  }

  function onUserSelect(user: any): void {
    console.log("useruseruseruseruseruser", user)
    setSelectedUser(user)
    setPopup2(true)
    // dispatch(changeSelectedProduct(user)); // You might want to create a similar action for users
    // dispatch(setModificationState(ProductModificationStatus.Edit));
  }
  function callAPIUpdateData() {
    axios.get('https://vertex-fx.onrender.com/admin/users')
      .then(response => {
        if (response.data.status) {
          const userData = response.data.data;
          setUsers(userData);
          setUserCount(userData.length);
          setTotalWallet(userData.reduce((sum: any, user: any) => sum + (user.wallet || 0), 0));
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }

  const handleDelete = async () => {
    if (SelectedUserDelete._id) {
      try {
        const response = await fetch(`https://vertex-fx.onrender.com/admin/users/${SelectedUserDelete._id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          dispatch(addNotification("User removed", `User ${SelectedUserDelete.fullName} was removed successfully`));
          axios.get('https://vertex-fx.onrender.com/admin/users')
            .then(response => {
              if (response.data.status) {
                const userData = response.data.data;
                setUsers(userData);
                setUserCount(userData.length);
                setTotalWallet(userData.reduce((sum: any, user: any) => sum + (user.wallet || 0), 0));
              }
            })
            .catch(error => {
              console.error('Error fetching user data:', error);
            });
          setPopup(false);
        } else {
          throw new Error("Failed to remove user");
        }
      } catch (error) {
        console.error("Error removing user:", error);
        dispatch(addNotification("Error", "Failed to remove user"));
      }
    }
  };


  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Blogs Management</h1>
      <p className="mb-4">All Blogs here</p>
      <div className="row">
        {/* <TopCard title="PRODUCT COUNT" text={`${numberItemsCount}`} icon="box" class="primary" /> */}
        {/* <TopCard title="PRODUCT AMOUNT" text={`${totalAmount}`} icon="warehouse" class="danger" /> */}
        {/* <TopCard title="SUMMARY PRICE" text={`$${totalPrice}`} icon="dollar-sign" class="success" /> */}
        {/* Add a TopCard for User Count */}
        <TopCard title="USER COUNT" text={`${userCount}`} icon="users" class="info" />
        {/* Add a TopCard for Total Wallet Amount */}
        <TopCard title="TOTAL WALLET AMOUNT" text={`₹${totalWallet}`} icon="wallet" class="warning" />
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">User List</h6>
              <div className="header-buttons">
                {/* <button className="btn btn-success btn-green" onClick={() =>
                  dispatch(setModificationState(ProductModificationStatus.Create))}>
                  <i className="fas fa fa-plus"></i>
                </button> */}
                {/* <button className="btn btn-success btn-blue" onClick={() => */}
                {/* <button className="btn btn-success btn-green" onClick={() =>
                  dispatch(setModificationState(ProductModificationStatus.Edit))}>
                  <i className="fas fa fa-pen"></i>
                </button>
                <button className="btn btn-success btn-red" onClick={() => onProductRemove()}>
                  <i className="fas fa fa-times"></i>
                </button> */}
              </div>
            </div>
            <div className="card-body">
              <UserManagementList
                onSelect={onUserSelect}
                onSelectDelete={onSelectDeleteUser}
                users={users}
              // SelectedUser={SelectedUser}
              />
            </div>
          </div>
        </div>
        {/* {(SelectedUser.id) ?
          <UserManagementForm /> : null} */}
      </div>

      <Popup
        className="popup-modal-user"
        open={popup2}
        onClose={() => setPopup2(false)}
        closeOnDocumentClick
      >
        <UserManagementForm SelectedUser={SelectedUser} onHide={() => setPopup2(false)} callAPIUpdateData={callAPIUpdateData} />
      </Popup>

      <Popup
        className="popup-modal"
        open={popup}
        onClose={() => setPopup(false)}
        closeOnDocumentClick
      >
        <div className="popup-modal">
          <div className="popup-title">
            Are you sure?
          </div>
          <div className="popup-content">
            <button type="button"
              className="btn btn-danger"
              onClick={handleDelete}>Remove
            </button>
          </div>
        </div>
      </Popup>
    </Fragment>
  );
};

export default UserManagement;

import ContactDataView from "./ContactDataView";
import UserDataView from "./UserDataView";
import ContactDataViewCard from "./ContactDataViewCard";

const RightSidebarPreview = (props) => {

    return (
        <div className="h-full w-full">
            {props.selectedContact ? (
                <ContactDataView
                    selectedContact={props.selectedContact} 
                    handleEditContactClick={props.handleEditContactClick}
                    handleCloseContactView={props.handleCloseContactView}
                />
            ) : (
                <UserDataView 
                    onEditClick={props.onEditClick}
                    userData={props.userData}
                        handleCloseContactView={props.handleCloseContactView}
                />
            )}
        </div>
    );
}

export default RightSidebarPreview;
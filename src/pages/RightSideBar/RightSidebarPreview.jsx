import ContactDataView from "./ContactDataView";
import UserDataView from "./UserDataView";

const RightSidebarPreview = (props) => {

    return (
        <div className="h-full w-full">
            {props.selectedContact ? (
                <ContactDataView
                    selectedContact={props.selectedContact} 
                    setSelectedContact={props.setSelectedContact}
                    handleEditContactClick={props.handleEditContactClick}
                    handleCloseContactView={props.handleCloseContactView}
                    onUpdateContact={props.onUpdateContact}
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
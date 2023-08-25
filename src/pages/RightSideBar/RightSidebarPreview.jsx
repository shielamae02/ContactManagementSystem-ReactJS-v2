import ContactDataView from "./ContactDataView";
import UserDataView from "./UserDataView";

const RightSidebarPreview = (props) => {

    return (
        <div className="h-full w-full">
            {props.selectedContact ? (
                <ContactDataView 
                    selectedContact={props.selectedContact} 
                    handleEditContactClick={props.handleEditContactClick}
                />
            ) : (
                <UserDataView 
                    onEditClick={props.onEditClick}
                    userData={props.userData}
                />
            )}
        </div>
    );
}

export default RightSidebarPreview;
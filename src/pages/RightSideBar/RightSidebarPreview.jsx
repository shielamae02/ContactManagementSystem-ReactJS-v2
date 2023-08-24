import ContactDataView from "./ContactDataView";
import UserDataView from "./UserDataView";

const RightSidebarPreview = (props) => {

    return (
        <div className="h-full w-full">
            {props.selectedContact ? (
                <ContactDataView 
                    selectedContact={props.selectedContact} 
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
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
                <UserDataView />
            )}
        </div>
    );
}

export default RightSidebarPreview;
import React from 'react'
import { Modal, Tabs } from 'antd'
import ModalCancelButton from '../buttons/ModalCancelButton'
export default function UserDetailsView(props) {
    const { userDetails, open, handleCancel } = props

    function UserProfile(props) {
        const { userDetails: { username, firstName, lastName } } = props
        return (
            <>
                <p>{firstName}</p>
                <p>{lastName}</p>
                <p>{username}</p>
            </>
        )
    }

    function UserPermissions(props) {
        const { userDetails: { roles, isAccountNonExpired, isAccountNonLocked, isCredentialsNonExpired } } = props
        return (
            <>
                <p>{JSON.stringify(roles)}</p>
                <p>{isAccountNonExpired}</p>
                <p>{isAccountNonLocked}</p>
                <p>{isCredentialsNonExpired}</p>
            </>
        )
    }
    const items = [
        {
            key: '1',
            label: 'Profile',
            children: <UserProfile userDetails={userDetails}/>
        },
        {
            key: '2',
            label: 'Permissions',
            children: <UserPermissions userDetails={userDetails}/>
        },
    ]

    return (
    <>
        <Modal
            title='User Details'
            open={open}
            onCancel={handleCancel}
            footer={[
                <ModalCancelButton text='Close' handleCancel={handleCancel}/>
            ]}
        >
            {/* <p>{userDetails.firstName}</p>
            <p>{userDetails.lastName}</p>
            <p>{userDetails.username}</p>
            <p>{JSON.stringify(userDetails.roles)}</p>
            <p>{userDetails.isAccountNonExpired}</p>
            <p>{userDetails.isAccountNonLocked}</p>
            <p>{userDetails.isCredentialsNonExpired}</p>
            <p>{userDetails.isEnabled}</p>
            <p>{userDetails.createdAt}</p>
            <p>{userDetails.updatedAt}</p> */}
            <Tabs 
                defaultActiveKey='1'
                items={items}
/>
        </Modal>
        
    </>

    )
}

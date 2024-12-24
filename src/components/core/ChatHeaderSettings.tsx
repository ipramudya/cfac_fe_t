import * as api from '@/api'
import { ChangePasswordForm, changePasswordFormSchema } from '@/form-validation'
import { useGetMessages } from '@/hooks'
import { useInMemoryMessages, useSession } from '@/state'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { Key01Icon, Logout01Icon, Menu09Icon, MessageCancel02Icon } from 'hugeicons-react'
import React from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const menuList = [
  { text: 'Change Password', Icon: Key01Icon, type: 'change-password' },
  { text: 'Clear Messages', Icon: MessageCancel02Icon, type: 'clear-messages' },
  { text: 'Logout', Icon: Logout01Icon, type: 'logout' },
] as const

export function ChatHeaderSettings() {
  const [changePasswordPopup, setChangePasswordPopup] = React.useState(false)
  const [clearMessagesPopup, setClearMessagesPopup] = React.useState(false)
  const navigate = useNavigate()
  const clearSession = useSession((state) => state.clearSession)

  const remapHandlers = (type: (typeof menuList)[number]['type']) => {
    switch (type) {
      case 'change-password':
        return setChangePasswordPopup(true)
      case 'clear-messages':
        return setClearMessagesPopup(true)
      case 'logout':
        return onLogout()
      default:
        return
    }
  }

  const onLogout = () => {
    clearSession()
    navigate('/auth/login')
  }

  return (
    <>
      {changePasswordPopup && (
        <RenderChangePasswordPopup
          open={changePasswordPopup}
          onClose={() => setChangePasswordPopup(false)}
        />
      )}

      {clearMessagesPopup && (
        <RenderClearMessagesPopup
          open={clearMessagesPopup}
          onClose={() => setClearMessagesPopup(false)}
        />
      )}

      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button size="sm" isIconOnly aria-label="settings" variant="light">
            <Menu09Icon strokeWidth="2" size={16} className="text-inherit" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {menuList.map((menu) => (
            <DropdownItem
              key={`dd-${menu.type}`}
              startContent={<menu.Icon strokeWidth={2} size={16} />}
              color={menu.type === 'logout' ? 'danger' : 'default'}
              className={menu.type === 'logout' ? 'text-danger' : 'text-content4-foreground'}
              onPress={() => remapHandlers(menu.type)}
            >
              {menu.text}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

function RenderClearMessagesPopup({ open, onClose }: { open: boolean; onClose: VoidFunction }) {
  const clearInMemoryMessages = useInMemoryMessages((state) => state.clearMessages)
  const { refetch: refetchMessages } = useGetMessages()

  const onClearMessages = async () => {
    clearInMemoryMessages()
    const res = await api.deleteMessage()
    if (res.error) {
      toast.error("Couldn't clear messages")
    } else {
      refetchMessages()
    }
    onClose()
  }

  return (
    <Modal isOpen={open} size="md" onClose={onClose}>
      <ModalContent>
        <ModalHeader>Clear Messages</ModalHeader>
        <ModalBody>
          <p className="text-sm text-content4-foreground">
            Are you sure you want to clear all messages? This action cannot be undone.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" size="sm" onPress={onClose}>
            Cancel
          </Button>
          <Button color="danger" size="sm" onPress={onClearMessages}>
            Proceed
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function RenderChangePasswordPopup({ open, onClose }: { open: boolean; onClose: VoidFunction }) {
  const form = useForm<ChangePasswordForm>({
    mode: 'onBlur',
    resolver: zodResolver(changePasswordFormSchema),
  })

  return (
    <FormProvider {...form}>
      <Modal isOpen={open} size="md" onClose={onClose}>
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalBody className="pb-6">
            <ChangePasswordPopupForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </FormProvider>
  )
}

function ChangePasswordPopupForm({ onClose }: { onClose: VoidFunction }) {
  const form = useFormContext<ChangePasswordForm>()

  const onSubmit = form.handleSubmit(async (formData) => {
    const res = await api.changePassword(formData)

    if (res.error) {
      form.setError('oldPassword', { message: res.error })
      form.setError('newPassword', { message: res.error })
      form.setError('confirmNewPassword', { message: res.error })
      return
    }

    onClose()
    toast.success('Password changed successfully')
  })

  const [passwordVisible, setPasswordVisible] = React.useState(false)
  const togglePasswordVisibility = () => setPasswordVisible((prevState) => !prevState)

  return (
    <form className="flex flex-col space-y-4" onSubmit={onSubmit}>
      <Input
        {...form.register('oldPassword')}
        label="Old Password"
        placeholder="Enter your old password"
        variant="bordered"
        errorMessage={form.formState.errors.oldPassword?.message}
        isInvalid={Boolean(form.formState.errors.oldPassword)}
        type={passwordVisible ? 'text' : 'password'}
        size="sm"
      />
      <Input
        {...form.register('newPassword')}
        label="New Password"
        placeholder="Enter your new password"
        variant="bordered"
        errorMessage={form.formState.errors.newPassword?.message}
        isInvalid={Boolean(form.formState.errors.newPassword)}
        type={passwordVisible ? 'text' : 'password'}
        size="sm"
      />
      <Input
        {...form.register('confirmNewPassword')}
        label="Confirm New Password"
        placeholder="Re-type your new password"
        variant="bordered"
        type={passwordVisible ? 'text' : 'password'}
        errorMessage={form.formState.errors.confirmNewPassword?.message}
        isInvalid={Boolean(form.formState.errors.confirmNewPassword)}
        size="sm"
      />
      <Checkbox
        size="sm"
        className="!mt-1"
        isSelected={passwordVisible}
        onChange={togglePasswordVisibility}
      >
        View passwords
      </Checkbox>
      <Button
        color="primary"
        type="submit"
        isDisabled={!form.formState.isValid}
        isLoading={form.formState.isSubmitting}
        size="sm"
      >
        Continue
      </Button>
    </form>
  )
}

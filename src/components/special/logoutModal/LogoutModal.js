import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constValues/Routes";
import { useRemoveAuthTokens } from "@/hooks/useRemoveAuthTokens";
import GButton from "@/components/general/GeneralButton/GeneralButton";
import GeneralModal from "@/components/general/GeneralModal/GeneralModal";

const LogoutModal = ({ isOpen, onClose }) => {
  const { removeTokens } = useRemoveAuthTokens();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onLogout = () => {
    setLoading(true);
    removeTokens();
    router.push(`${ROUTES.AUTH.SIGN_IN}`);
  };

  const modalActions = [
    <GButton
      key="cancel"
      onClick={onClose}
      type="secondary"
      variant="outline"
      fullWidth={true}
      disabled={loading}
    >
      {"انصراف"}
    </GButton>,

    <GButton
      key="confirm"
      type="danger"
      variant="filled"
      fullWidth={true}
      onClick={onLogout}
      loadingText={"در حال خروج"}
      loading={loading}
    >
      {"خروج"}
    </GButton>,
  ];

  return (
    <GeneralModal
      isOpen={isOpen}
      onClose={onClose}
      actions={modalActions}
      preventClose={loading}
      closeOnOverlayClick={!loading}
      title={"خروج از حساب کاربری"}
    >
      <p>{"آیا می‌خواهید از پنل خارج شوید؟"}</p>
    </GeneralModal>
  );
};

export default LogoutModal;

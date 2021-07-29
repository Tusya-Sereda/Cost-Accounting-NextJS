import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../query/user";
import InfoById from "../../components/InfoById";
import EditById from "../../components/EditById";
import { useRouter } from "next/router";
import useKeyPress from "../../hooks/UseKeyPress";
import useWindowSize from "../../hooks/useWindowSize";
import CircularIndeterminate from "../../components/Spinner";
import style from "../../styles/onePurchase.module.scss";

export default function NodeId() {
  const router = useRouter();
  const { id } = router.query;
  const [onePurchase, setOnePurchase] = useState();
  const [editIndex, setEditIndex] = useState(false);
  const someText = useKeyPress("Control", "a");

  const { loading, error, data, refetch } = useQuery(GET_USER, {
    variables: { id: +id },
  });

  const sizeWindow = useWindowSize();
  console.log("width:", sizeWindow.width, "height:", sizeWindow.height);

  const getArray = () => {
    if (data) setOnePurchase(data.getUser);
  };

  useEffect(() => {
    getArray();
  }, [data]);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  useEffect(() => {
    if (someText) {
      setEditIndex(id);
    }
  }, [someText]);

  if (loading) {
    return <CircularIndeterminate />;
  }

  return (
    <div className={style.info_about_one_cost} data-tesid="info_about_one_cost">
      <div className={style.content_purchase} data-testid="content_purchase">
        {!editIndex ? (
          <InfoById setEditIndex={setEditIndex} onePurchase={onePurchase} />
        ) : (
          <EditById setEditIndex={setEditIndex} onePurchase={onePurchase} />
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../query/user";
import InfoById from "../../comonents/InfoById";
import EditById from "../../comonents/EditById";
import { useRouter } from "next/router";
import useKeyPress from "../../hooks/UseKeyPress";
import useWindowSize from "../../hooks/useWindowSize";
import CircularIndeterminate from "../../comonents/Spinner";
import style from "../../styles/onePurchase.module.scss";

export default function NodeId() {
  const router = useRouter();
  const { id } = router.query;
  const [onePurchase, setOnePurchase] = useState();
  const [editIndex, setEditIndex] = useState(-1);
  const someText = useKeyPress("s", "a");

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
  }, [id, data]);

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
    <CircularIndeterminate />;
  }
  return (
    <div className={style.info_about_one_cost}>
      {/* {sizeWindow.width}px / {sizeWindow.height}px */}
      <div className={style.content_purchase}>
        {editIndex === -1 ? (
          <InfoById setEditIndex={setEditIndex} onePurchase={onePurchase} />
        ) : (
          <EditById setEditIndex={setEditIndex} onePurchase={onePurchase} />
        )}
      </div>
    </div>
  );
}

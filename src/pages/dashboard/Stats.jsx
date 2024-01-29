/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showStats } from "../../features/allJobs/alljobsSlice";
import Loading from "../../components/Loading";
import { StatsContainer, ChartsContainer } from "../../components";

const Stats = () => {
  const dispatch = useDispatch();
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );
  useEffect(() => {
    dispatch(showStats());
    return () => {};
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />

      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;

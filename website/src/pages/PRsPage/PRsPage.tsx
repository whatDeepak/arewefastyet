/*
Copyright 2023 The Vitess Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import useApiCall from "@/utils/Hook";
import RingLoader from "react-spinners/RingLoader";

import PRTable from "./components/PRTable";
import { prDataTypes } from "@/types";
import PRHero from "./components/PRHero";

export default function PRsPage() {
  const {
    data: dataPRList,
    isLoading: isPRListLoading,
    error: PRListError,
  } = useApiCall<prDataTypes>(`${import.meta.env.VITE_API_URL}pr/list`);

  return (
    <>
      <PRHero/>

      {isPRListLoading && (
        <div className="flex justify-center w-full my-16">
          <RingLoader loading={isPRListLoading} color="#E77002" size={300} />
        </div>
      )}

      {PRListError ? <div className="text-red-500 text-center my-2">{PRListError}</div> : null}

      {!isPRListLoading && dataPRList && <PRTable data={dataPRList} />}
    </>
  );
}

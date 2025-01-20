import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PartDescription from "../PartDescription/PartDescription";
import { useGetCarInfoQuery } from "../../../../services/PartService";
import Loading from "../../../../components/Preloader/Loading";

interface Modification {
  id: number;
  brandName: string;
  modelName: string;
  name: string;
  yearStart: number;
  yearEnd: number;
}

interface Breadcrumbs {
  brand: string;
  model: string;
  modification: Modification[];
}

interface Part {
  modification: number;
  year?: string;
  rhd: string;
  fuel_type: string;
  wheels: string;
  gearbox_type?: string;
  capacity?: string;
  power?: string;
}

interface CarDescriptionProps {
  part: Part;
}

export default function CarDescription({ part }: CarDescriptionProps) {
  const { data, isLoading } = useGetCarInfoQuery(part.modification);
  const breadcrumbs: Breadcrumbs | undefined = data;
  const [modification, setModification] = useState<Modification | null>(null);

  useEffect(() => {
    if (breadcrumbs) {
      const matchedModification = breadcrumbs.modification.find(
        (item) => item.id === part.modification
      );
      setModification(matchedModification || null);
    }
  }, [breadcrumbs, part.modification]);

  const getQueryString = (additionalParams = {}) => {
    const params = {
      brand: breadcrumbs?.brand || "",
      ...additionalParams,
    };
    return new URLSearchParams(params).toString();
  };

  return isLoading ? (
    <Loading />
  ) : (
    <PartDescription title={"Car Description"}>
      <dl>
        <>
          <dt>Manufacturer</dt>
          <dd>
            <Link to={`/parts?${getQueryString()}`}>
              {modification?.brandName || "-"}
            </Link>
          </dd>
        </>
        <>
          <dt>Series</dt>
          <dd>
            <Link
              to={`/parts?${getQueryString({
                model: breadcrumbs?.model || "",
              })}`}
            >
              {modification?.modelName || "-"}
            </Link>
          </dd>
        </>
        <>
          <dt>Model</dt>
          <dd>
            <Link
              to={`/parts?${getQueryString({
                model: breadcrumbs?.model || "",
                modification: modification?.id,
              })}`}
            >
              {modification?.name || "-"}
            </Link>
          </dd>
        </>
        <>
          <dt>Year</dt>
          <dd>
            {modification
              ? `${modification.yearStart} - ${modification.yearEnd}`
              : "-"}
          </dd>
        </>
        <>
          <dt>Model Year</dt>
          <dd>{part.year || "-"}</dd>
        </>
        <>
          <dt>Steering wheel position</dt>
          <dd>{part.rhd === "0" ? "Left" : "Right"}</dd>
        </>
        <>
          <dt>Fuel type</dt>
          <dd>{part.fuel_type !== "not specified" ? part.fuel_type : "Diesel"}</dd>
        </>
        <>
          <dt>Driving wheels</dt>
          <dd>{part.wheels.toUpperCase()}</dd>
        </>
        <>
          <dt>Gearbox type</dt>
          <dd>{part.gearbox_type || "-"}</dd>
        </>
        <>
          <dt>Engine capacity, cm3</dt>
          <dd>{part.capacity || "-"}</dd>
        </>
        <>
          <dt>Engine power, kW</dt>
          <dd>{part.power || "-"}</dd>
        </>
      </dl>
    </PartDescription>
  );
}
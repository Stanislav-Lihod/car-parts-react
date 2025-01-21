import React, { useEffect, useState } from 'react';
import PartDescription from "../PartDescription/PartDescription";

interface Part {
  manufacturer_code: string;
  visible_code: string;
  other_code: string;
  quality: string;
}

interface PartDetailsProps {
  part: Part;
}

export default function PartDetails({ part }: PartDetailsProps) {
  const [codes, setCodes] = useState<string[]>([]);

  useEffect(() => {
    setCodes(
      [part.manufacturer_code, part.visible_code, part.other_code].filter(
        (code) => code !== ''
      )
    );
  }, [part]);

  return (
    <PartDescription title="Part Details">
      <dl>
        <dt>Condition</dt>
        <dd>{part.quality === '' ? 'Used' : 'New'}</dd>
        {codes.length > 0 ? (
          <>
            <dt>Manufacturer code:</dt>
            <dd>
              {codes.map((code, index) => (
                <React.Fragment key={index}>
                  {code}
                  <br />
                </React.Fragment>
              ))}
            </dd>
          </>
        ) : null}
      </dl>
    </PartDescription>
  );
}
import React, {useEffect, useState} from 'react';
import PartDescription from "../PartDescription/PartDescription";

export default function PartDetails({part}) {
  const [codes, setCodes] = useState([])

  useEffect(()=>{
    setCodes([part.manufacturer_code, part.visible_code, part.other_code].filter(code => code !== ''))
  }, [])

  return (
    <PartDescription title={'Part Details'}>
      <dl>
        <dt>Condition</dt>
        <dd>{part.quality === '' ? 'Used' : 'New'}</dd>
        {codes.length > 0 ? (
          <>
            <dt>Manufacturer code:</dt>
            <dd>{
              codes.map((code, index) =>(
                <React.Fragment key={index}>
                  {code}
                  <br />
                </React.Fragment>
              ))
            }</dd>
          </>
        ): null}
      </dl>
    </PartDescription>
  );
}
import React from "react";
import * as dateFns from "date-fns";
import { formatDistance, subDays } from 'date-fns'
const dateFnsSample = () => {

//formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true })
//3days ago

  return <div>{dateFns.format(new Date(), "yyyy-MM-dd")}</div>;
};

export default dateFnsSample;





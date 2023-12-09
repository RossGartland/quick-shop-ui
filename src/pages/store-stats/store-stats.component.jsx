import React, { useEffect, useState } from "react";
import StatCard from "../../components/statistics-components/stat-card.component";
import orderService from "../../services/order.service";

function StoreStats(props) {
  const [stats, setStats] = useState([]);
  const { storeID } = props;
  useEffect(() => {
    orderService
      .getStoreOrderStats(storeID)
      .then((stats) => setStats(stats))
      .catch((error) => {});
  }, []);

  return (
    <div class="pt-5">
      <div class="container-fluid">
        <div class="row">
          <StatCard
            title={"Revenue"}
            number={"£" + stats.revenue}
            description={"Total revenue earned."}
          />
          <StatCard
            title={"Orders"}
            number={stats.totalOrders}
            description={"Total orders received."}
          />
          <StatCard
            title={"Products Sold"}
            number={stats.productsSold}
            description={"Total products sold"}
          />
        </div>
      </div>
    </div>
  );
}
export default StoreStats;

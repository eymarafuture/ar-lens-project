import React from "react";

const Dashboard = () => {
  return (
    <div className="bg-info container-fluid vh-100">
      <div className="row h-100">
        <div className="col-xl-2 col-lg-3 col-md-4 col-12 ">
          <div className="bg-success p-2 h-100">
            <div className="bg-danger p-2 mb-2">logo section</div>
            <div className="bg-light p-2 shadow mb-2">profile section</div>
            <div className="p-2 bg-primary">menu section</div>
          </div>
        </div>
        <div className="col-xl-10 col-lg-9 col-md-8 col-12 ">
          <div className="bg-warning p-2 h-100">
            <div className="bg-danger p-2 mb-2">header section</div>

            {/* analytics */}
            <div className="row mb-2">
              {[1, 2, 3, 4].map((item) => (
                <div className="col-md-3">
                  <div className="bg-info shadow p-2">{item} box section</div>
                </div>
              ))}
            </div>

            {/* inventory listing */}
            <div className="bg-secondary p-2 mb-2">
              inventory table header section
            </div>
            <table className="mb-2">
              <thead>
                <tr className="bg-light border-2 border-light">
                  <td className="p-2">name</td>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((item) => (
                  <tr className="bg-info border-2 border-light">
                    <td className="p-2 ">{item} table item</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-secondary p-2 mb-2">pagination section</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

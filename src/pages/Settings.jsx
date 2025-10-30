import React from "react";
import UpdateSettingsForm from "../features/Settings/UpdateSettingsForm";

function Settings() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-700">
        Update hotel settings
      </h2>
      <UpdateSettingsForm/>
    </div>
  );
}

export default Settings;

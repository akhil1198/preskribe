import React, { useState } from "react";
import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AlertComponent = (props) => {
	return (
		<Collapse in={props.open}>
			<Alert
				action={
					<IconButton
						aria-label="close"
						color="inherit"
						size="small"
						onClick={() => {
							props.setOpen(false);
							props.setAlertContent();
						}}
					>
						<CloseIcon fontSize="inherit" />
					</IconButton>
				}
				severity={props.alertContent.status === 200 ? "success" : "error"}
				sx={{ mb: 2 }}
			>
				{props.alertContent.message}
			</Alert>
		</Collapse>
	);
};

export default AlertComponent;

<?php 


require( 'config.php' );

if ( isset( $_POST['email'] ) ) {

	
	function cleanFields( $elem ) {
		return strip_tags( $elem );
	}

	extract( array_map( 'cleanFields', $_POST ) );

	
	if ( empty( $name ) || empty( $email ) || empty( $message ) ) {

		echo 'fail';

	} else {

		date_default_timezone_set('Etc/UTC');

		require 'PHPMailer/PHPMailerAutoload.php';

		$mail = new PHPMailer;

		if ( $smtp ) {
			
			$mail->isSMTP();
			$mail->Host = $smtp_host;
			$mail->Port = $smtp_port;
			$mail->SMTPSecure = $smtp_secure;
			$mail->SMTPAuth = true;
			$mail->Username = $smtp_username;
			$mail->Password = $smtp_password;
		}

		$mail->setFrom( $email, '=?UTF-8?B?' . base64_encode( $name ) . '?=' );
		$mail->addReplyTo( $email );
		$mail->addAddress( $to );
		$mail->Subject = '=?UTF-8?B?' . base64_encode( $subject ) . '?=';
		$mail->isHTML( true );
		$mail->Body = $message;
		$mail->CharSet = 'UTF-8';

		if ( $mail->send() ) {
		    echo 'success';
		} else {
		    echo 'fail';
		}

	}

}
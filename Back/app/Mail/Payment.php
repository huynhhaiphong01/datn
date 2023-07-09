<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Payment extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */

    protected $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this
                ->subject("CINEMA PRO MAX: PAYMENT SUCCESS")
                ->view('mail.payment')
                ->with([
                    'user_name' => $this->data["user_name"],
                    'Message' => $this->data["Message"],
                    'total' => $this->data["total"],
                ]);
    }
}

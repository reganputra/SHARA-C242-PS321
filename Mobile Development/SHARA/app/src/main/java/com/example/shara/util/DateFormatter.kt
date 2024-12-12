package com.example.shara.util

import java.text.DateFormat
import java.text.ParseException
import java.text.SimpleDateFormat
import java.util.Locale
import java.util.TimeZone

object DateFormatter {
    fun formatDate(currentDate: String): String {
        val currentFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.getDefault())
        val targetFormat = SimpleDateFormat("dd MMM yyyy | HH:mm", Locale.getDefault())


        currentFormat.timeZone = TimeZone.getTimeZone("Asia/Jakarta")
        targetFormat.timeZone = TimeZone.getTimeZone("Asia/Jakarta")

        return try {
            val date = currentFormat.parse(currentDate)
            date?.let {

                targetFormat.format(it)
            } ?: "Date not available"
        } catch (ex: ParseException) {
            "Invalid date"
        }
    }

    fun formatDateWib(inputDate: String): String {
        return try {

            val inputFormat = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault())
            inputFormat.timeZone = TimeZone.getTimeZone("UTC")


            val outputFormat = SimpleDateFormat("dd MMM yyyy, HH:mm", Locale.getDefault())
            outputFormat.timeZone = TimeZone.getTimeZone("Asia/Jakarta")


            val date = inputFormat.parse(inputDate)
            date?.let { outputFormat.format(it) } ?: "No Date"
        } catch (e: Exception) {
            "Invalid Date"
        }
    }

}


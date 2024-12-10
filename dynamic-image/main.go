package main

import (
	"fmt"
	"image/color"

	"github.com/fogleman/gg"
)

func main () {
	image, err := gg.LoadImage("./white-image.jpg")
	if(err != nil){
		fmt.Println("this is error")
		fmt.Println(err)
	}
	imageWidth := image.Bounds().Dx()
	imageHeight := image.Bounds().Dy()

	fmt.Println(imageWidth, imageHeight)
	dc := gg.NewContext(imageWidth, imageHeight);
	dc.DrawImage(image, 0 , 0)
	x := float64(imageWidth / 2)
	y := float64((imageHeight / 2) - 80)
	maxWidth := float64(imageWidth) - 60.0
	err = dc.LoadFontFace("./orange-juice-2.0.ttf", 48)
	if(err != nil){
		fmt.Println(err)
	}
	dc.SetColor(color.Black)
	dc.DrawStringWrapped("Hello World!", x, y, 0.5, 0.5, maxWidth, 3, gg.AlignCenter)
	dc.SavePNG("custom-image.png")
}
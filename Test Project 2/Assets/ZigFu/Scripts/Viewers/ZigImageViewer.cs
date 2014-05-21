using UnityEngine;
using System.Collections;
using System.IO;

public class ZigImageViewer : MonoBehaviour
{
    public Renderer target;
    public ZigResolution TextureSize = ZigResolution.QQVGA_160x120;
    Texture2D texture;
    ResolutionData textureSize;

    Color32[] outputPixels;
    // Use this for initialization

    private int screenshotCount = 0;
	public static float waitTime = 3.0f;
	static bool pictureTaken = false;


    void Start()
    {
        if (target == null)
        {
            target = renderer;
        }
        textureSize = ResolutionData.FromZigResolution(TextureSize);
        texture = new Texture2D(textureSize.Width, textureSize.Height);
        texture.wrapMode = TextureWrapMode.Clamp;
        renderer.material.mainTexture = texture;
        outputPixels = new Color32[textureSize.Width * textureSize.Height];
        ZigInput.Instance.AddListener(gameObject);
    }

    void UpdateTexture(ZigImage image)
    {
        Color32[] rawImageMap = image.data;
        int srcIndex = 0;
        int factorX = image.xres / textureSize.Width;
        int factorY = ((image.yres / textureSize.Height) - 1) * image.xres;
        // invert Y axis while doing the update
        for (int y = textureSize.Height - 1; y >= 0; --y, srcIndex += factorY) {
            int outputIndex = y * textureSize.Width;
            for (int x = 0; x < textureSize.Width; ++x, srcIndex += factorX, ++outputIndex) {
                outputPixels[outputIndex] = rawImageMap[srcIndex];
            }
        }
        texture.SetPixels32(outputPixels);
        texture.Apply();
		waitTime -= Time.deltaTime;
		if (waitTime <= 0.0f && !pictureTaken) {
           string screenshotFilename;
            do
            {
                screenshotCount++;
                screenshotFilename = "screenshot" + screenshotCount + ".png";

            } while (System.IO.File.Exists(screenshotFilename));
            FileStream file = new FileStream(Application.dataPath + "/" + screenshotFilename, FileMode.Create);
            BinaryWriter binary = new BinaryWriter(file);
            binary.Write(texture.EncodeToPNG());
            file.Close();
			pictureTaken = true;
        }
    }

    void Zig_Update(ZigInput input)
    {
		if (!pictureTaken) {
        	UpdateTexture(ZigInput.Image);
		}
    }
}
